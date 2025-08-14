// app/api/vercel/deploy/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Vercel } from "@vercel/sdk";
import { execSync } from 'child_process';

interface VercelDeploymentResponse {
  deploymentId: string;
  status: string;
  url?: string;
  createdAt: number;
  success: boolean;
}

interface DeploymentStatusResponse {
  id: string;
  status: string;
  isComplete: boolean;
}

// Helper function to create manual deploy commit
async function createManualDeployCommit(): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString();
    const commitMessage = `Manual deployment triggered - ${timestamp} [manual-deploy]`;
    
    console.log('Creating manual deploy commit...');
    
    // Create empty commit with manual deploy tag
    execSync(`git commit --allow-empty -m "${commitMessage}"`, { 
      stdio: 'inherit',
      timeout: 30000 
    });
    
    // Push to GitHub
    execSync('git push origin main', { 
      stdio: 'inherit',
      timeout: 60000 
    });
    
    console.log('✅ Manual deploy commit created and pushed successfully');
    return true;
    
  } catch (error: any) {
    console.log('ℹ️ Git operations handled, continuing with direct API deploy...', error.message);
    return false;
  }
}

// Helper function to safely get deployment status
function getDeploymentStatus(deployment: any): string {
  return deployment.readyState ?? 
         deployment.state ?? 
         deployment.status ?? 
         'UNKNOWN';
}

// Helper function to check if deployment is complete
function isDeploymentComplete(status: string): boolean {
  return ['READY', 'ERROR', 'CANCELED', 'FAILED'].includes(status.toUpperCase());
}

export async function POST(): Promise<
  NextResponse<VercelDeploymentResponse | { error: string; details?: any }>
> {
  try {
    // Initialize Vercel SDK
    const vercel = new Vercel({
      bearerToken: process.env.VERCEL_TOKEN?.trim(),
    });

    const projectId = process.env.VERCEL_PROJECT_ID?.trim();
    const githubRepo = process.env.GITHUB_REPO?.trim();
    const githubRepoId = process.env.GITHUB_REPO_ID?.trim();

    if (
      !process.env.VERCEL_TOKEN ||
      !projectId ||
      !githubRepo ||
      !githubRepoId
    ) {
      return NextResponse.json(
        {
          error: "Missing required environment variables",
          details: {
            hasVercelToken: !!process.env.VERCEL_TOKEN,
            hasProjectId: !!projectId,
            hasGithubRepo: !!githubRepo,
            hasGithubRepoId: !!githubRepoId,
            required: ['VERCEL_TOKEN', 'VERCEL_PROJECT_ID', 'GITHUB_REPO', 'GITHUB_REPO_ID']
          },
        },
        { status: 500 }
      );
    }

    // Parse GitHub repo info
    const [org, repo] = githubRepo.split("/");

    if (!org || !repo) {
      return NextResponse.json(
        {
          error: 'Invalid GITHUB_REPO format. Expected "owner/repo-name"',
          details: { githubRepo },
        },
        { status: 400 }
      );
    }

    console.log("🚀 Starting manual deployment process:", {
      projectId,
      org,
      repo,
      githubRepoId,
      tokenPresent: !!process.env.VERCEL_TOKEN,
    });

    // Step 1: Create manual deploy commit (optional - for should-build.js script)
    const gitSuccess = await createManualDeployCommit();
    
    // Step 2: Create deployment using Vercel SDK
    const deploymentPayload = {
      requestBody: {
        name: "aifablog",
        project: projectId,  // Only use project ID for existing projects
        target: "production" as const,
        
        // ✅ Use repoId for existing project deployment
        gitSource: {
          type: "github" as const,
          repoId: githubRepoId, // Use repoId instead of org/repo for existing projects
          ref: "main"
        },
        
        // ✅ Add environment variable to help should-build.js script
        env: {
          VERCEL_MANUAL_DEPLOY: 'true'
        }
      },
    };

    console.log("📦 Creating deployment with payload:", JSON.stringify(deploymentPayload, null, 2));

    const deployment = await vercel.deployments.createDeployment(deploymentPayload);

    console.log("✅ Deployment created successfully:", {
      id: deployment.id,
      status: deployment.status,
      url: deployment.url,
      createdAt: deployment.createdAt
    });

    return NextResponse.json({
      deploymentId: deployment.id || '',
      status: deployment.status || "BUILDING",
      url: deployment.url,
      createdAt: deployment.createdAt || Date.now(),
      success: true,
      gitCommitCreated: gitSuccess
    });

  } catch (error: any) {
    console.error("❌ Vercel SDK deployment error:", error);

    // Handle different types of SDK errors
    let errorMessage = "Failed to create deployment";
    let errorDetails = {};

    if (error.statusCode) {
      errorMessage = `Vercel API error (${error.statusCode})`;
      errorDetails = {
        statusCode: error.statusCode,
        message: error.message,
        body: error.body,
        timestamp: new Date().toISOString()
      };
    } else if (error.message) {
      errorMessage = error.message;
      errorDetails = { 
        originalError: error.toString(),
        timestamp: new Date().toISOString()
      };
    }

    // Log full error for debugging
    console.error("Full error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      body: error.body
    });

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<DeploymentStatusResponse | { error: string; details?: any }>
> {
  try {
    const { searchParams } = new URL(request.url);
    const deploymentId = searchParams.get("deploymentId");

    if (!deploymentId) {
      return NextResponse.json(
        { error: "deploymentId parameter is required" },
        { status: 400 }
      );
    }

    if (!process.env.VERCEL_TOKEN) {
      return NextResponse.json(
        { error: "VERCEL_TOKEN environment variable is missing" },
        { status: 500 }
      );
    }

    // Initialize Vercel SDK
    const vercel = new Vercel({
      bearerToken: process.env.VERCEL_TOKEN.trim(),
    });

    console.log("🔍 Checking deployment status:", { deploymentId });

    // Get deployment status using Vercel SDK
    const deployment = await vercel.deployments.getDeployment({
      idOrUrl: deploymentId,
      withGitRepoInfo: "true",
    });

    // ✅ Use helper functions for safer status handling
    const currentStatus = getDeploymentStatus(deployment);
    const isComplete = isDeploymentComplete(currentStatus);

    console.log("📊 Deployment status retrieved:", {
      id: deployment.id || deploymentId,
      status: currentStatus,
      isComplete,
      url: deployment.url,
      createdAt: deployment.createdAt
    });

    return NextResponse.json({
      id: deployment.id || deploymentId,
      status: currentStatus,
      isComplete,
      url: deployment.url,
      createdAt: deployment.createdAt
    });

  } catch (error: any) {
    console.error("❌ Vercel SDK status check error:", error);

    let errorMessage = "Failed to check deployment status";
    let errorDetails = {};

    if (error.statusCode) {
      errorMessage = `Vercel API error (${error.statusCode})`;
      errorDetails = {
        statusCode: error.statusCode,
        message: error.message,
        body: error.body,
        timestamp: new Date().toISOString()
      };
    } else if (error.message) {
      errorMessage = error.message;
      errorDetails = { 
        originalError: error.toString(),
        timestamp: new Date().toISOString()
      };
    }

    // Enhanced error logging
    console.error("Status check error details:", {
      deploymentId: new URL(request.url).searchParams.get("deploymentId"),
      errorName: error.name,
      errorMessage: error.message,
      hasToken: !!process.env.VERCEL_TOKEN
    });

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
