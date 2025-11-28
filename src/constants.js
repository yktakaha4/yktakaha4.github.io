"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubIgnoreOwnerNames = exports.gitHubLanguageSizeThreshold = exports.gitHubStargazersCountThreshold = exports.gitHubLogin = exports.qiitaUserName = exports.zennBaseURL = exports.zennUserName = exports.pagerPerPage = exports.pagerSize = exports.getComponentsDataPath = exports.getSNSDataPath = exports.getOSSContributionSizeKindName = exports.getOssContributionSizeKind = exports.getOssContributionIcon = exports.getOSSContributionKindName = exports.getTechArticlePublisherName = void 0;
var techArticlePublisherName = {
    zenn: 'Zenn',
    qiita: 'Qiita',
    note: 'note',
    techBlog: '技術ブログ',
    speakerDeck: 'SpeakerDeck',
    others: 'その他',
};
var getTechArticlePublisherName = function (publisher) {
    return techArticlePublisherName[publisher];
};
exports.getTechArticlePublisherName = getTechArticlePublisherName;
var ossContributionKindName = {
    mergedPullRequest: 'PRマージ',
};
var getOSSContributionKindName = function (kind) {
    return ossContributionKindName[kind];
};
exports.getOSSContributionKindName = getOSSContributionKindName;
var getOssContributionIcon = function (kind) {
    switch (kind) {
        case 'mergedPullRequest':
            return 'prMerge';
        default:
            return null;
    }
};
exports.getOssContributionIcon = getOssContributionIcon;
var OSSContributionSizeKindName = {
    xs: 'XS',
    s: 'S',
    m: 'M',
    l: 'L',
    xl: 'XL',
};
var getOssContributionSizeKind = function (lines) {
    if (lines < 10) {
        return 'xs';
    }
    else if (lines < 100) {
        return 's';
    }
    else if (lines < 500) {
        return 'm';
    }
    else if (lines < 1000) {
        return 'l';
    }
    else {
        return 'xl';
    }
};
exports.getOssContributionSizeKind = getOssContributionSizeKind;
var getOSSContributionSizeKindName = function (lines) {
    var kind = (0, exports.getOssContributionSizeKind)(lines);
    return OSSContributionSizeKindName[kind];
};
exports.getOSSContributionSizeKindName = getOSSContributionSizeKindName;
var snsDataBasePath = "".concat(__dirname, "/services/sns/data");
var getSNSDataPath = function (snsData) {
    return "".concat(snsDataBasePath, "/").concat(snsData, ".json");
};
exports.getSNSDataPath = getSNSDataPath;
var componentsDataBasePath = "".concat(__dirname, "/components/data");
var getComponentsDataPath = function (componentsData) {
    return "".concat(componentsDataBasePath, "/").concat(componentsData, ".json");
};
exports.getComponentsDataPath = getComponentsDataPath;
exports.pagerSize = 3;
exports.pagerPerPage = 10;
exports.zennUserName = 'yktakaha4';
exports.zennBaseURL = 'https://zenn.dev';
exports.qiitaUserName = 'yktakaha4';
exports.gitHubLogin = 'yktakaha4';
exports.gitHubStargazersCountThreshold = 10;
exports.gitHubLanguageSizeThreshold = 0.3;
exports.gitHubIgnoreOwnerNames = ['yktakaha4', 'lapras-inc'];
