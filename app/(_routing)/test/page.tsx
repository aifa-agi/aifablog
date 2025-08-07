

import { paromyTenerifePageData } from "@/app/config/temp-example-page-data";
import { JsonToHtmlTransformer } from "@/app/(_service)/components/json-to-html-transformer/json-to-html-transformer";



export default function TestPage() {
  return (
    <main >
      <JsonToHtmlTransformer data={paromyTenerifePageData} />
    </main>
  );
}
