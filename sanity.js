     
import sanityClient from "@sanity/client";
import {SANITY_DATASET,SANITY_PROJECT_ID} from './branch-specific-config'
export default sanityClient({
    // Find your project ID and dataset in `sanity.json` in your studio project
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    useCdn: true
  });