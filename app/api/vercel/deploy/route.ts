// API endpoint for triggering Vercel deployments
import { NextRequest, NextResponse } from 'next/server'
//import { auth } from '@/auth'

interface VercelDeploymentResponse {
  id: string
  url: string
  status: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED'
  createdAt: number
}

interface VercelDeploymentStatusResponse {
  id: string
  status: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED'
  readyState: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED'
}

export async function POST() {
  try {
    // Check authentication - only admin users can trigger deploys
    // const session = await auth()
    // if (!session?.user || session.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Unauthorized - Admin access required' },
    //     { status: 401 }
    //   )
    // }

    const vercelToken = process.env.VERCEL_TOKEN
    const projectId = process.env.VERCEL_PROJECT_ID
    
    if (!vercelToken || !projectId) {
      return NextResponse.json(
        { error: 'Vercel configuration missing' },
        { status: 500 }
      )
    }

    // Trigger new deployment
    const deployResponse = await fetch(`https://api.vercel.com/v13/deployments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectId,
        gitSource: {
          type: 'github',
          repoId: process.env.GITHUB_REPO_ID,
          ref: 'main'
        }
      })
    })

    if (!deployResponse.ok) {
      const error = await deployResponse.text()
      return NextResponse.json(
        { error: `Failed to trigger deployment: ${error}` },
        { status: 500 }
      )
    }

    const deployment: VercelDeploymentResponse = await deployResponse.json()

    return NextResponse.json({
      deploymentId: deployment.id,
      status: deployment.status,
      url: deployment.url,
      createdAt: deployment.createdAt
    })

  } catch (error) {
    console.error('Deployment trigger error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    // const session = await auth()
    // if (!session?.user || session.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   )
    // }

    const { searchParams } = new URL(request.url)
    const deploymentId = searchParams.get('deploymentId')

    if (!deploymentId) {
      return NextResponse.json(
        { error: 'Deployment ID required' },
        { status: 400 }
      )
    }

    const vercelToken = process.env.VERCEL_TOKEN
    
    if (!vercelToken) {
      return NextResponse.json(
        { error: 'Vercel token missing' },
        { status: 500 }
      )
    }

    // Check deployment status
    const statusResponse = await fetch(
      `https://api.vercel.com/v13/deployments/${deploymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${vercelToken}`,
        }
      }
    )

    if (!statusResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to check deployment status' },
        { status: 500 }
      )
    }

    const status: VercelDeploymentStatusResponse = await statusResponse.json()

    return NextResponse.json({
      id: status.id,
      status: status.readyState,
      isComplete: ['READY', 'ERROR', 'CANCELED'].includes(status.readyState)
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
