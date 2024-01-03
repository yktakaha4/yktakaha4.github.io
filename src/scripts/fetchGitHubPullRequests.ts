import {gitHubLogin} from "@/constants";
import {fetchPullRequests, storePullRequests} from "@/services/sns/gitHub";

export const fetchGitHubPullRequests = async () => {
    const pullRequests = await fetchPullRequests(gitHubLogin)
    await storePullRequests(pullRequests)
}

if (require.main === module) {
    fetchGitHubPullRequests().then().catch()
}
