var consentContainerId = 'consent-container';
var cookiePolicyURL = 'https://webflow.com/legal/cookie-policy';

window.consentManagerConfig = function(exports) {
    var React = exports.React;
    var bannerContent = React.createElement('span', null,
        'We use cookies (and other similar technologies) to improve your experience on our site. By using this website you agree to our',
        ' ',
        React.createElement(
            'a', {
                href: cookiePolicyURL,
                target: '_blank'
            },
            'Cookie Policy'
        ),
        '.'
    );
    var preferencesDialogTitle = 'Cookie Preferences';
    var preferencesDialogContent = 'We use data collected by cookies and JavaScript libraries to improve your browsing experience, analyze site traffic, deliver personalized advertisements, and increase the overall performance of our site.';
    var cancelDialogTitle = 'Are you sure you want to cancel?';
    var cancelDialogContent = React.createElement(
        'span',
        null,
        'Your preferences have not been saved. By continuing to use our website, you՚re agreeing to our',
        ' ',
        React.createElement(
            'a', {
                href: cookiePolicyURL,
                target: '_blank'
            },
            'Cookie Policy'
        ),
        '.'
    );

    return {
        container: '#' + consentContainerId,
        writeKey: 'ibgxm5sktc4abh1chki2',
        shouldRequireConsent: function() {
            return window.wf_continentCode === 'EU';
        },
        bannerContent: bannerContent,
        preferencesDialogTitle: preferencesDialogTitle,
        preferencesDialogContent: preferencesDialogContent,
        cancelDialogTitle: cancelDialogTitle,
        cancelDialogContent: cancelDialogContent
    };
};

var body = document.getElementsByTagName('body')[0];

var consentDiv = document.createElement('div');
consentDiv.setAttribute('id', consentContainerId);
body.appendChild(consentDiv);

var consentScript = document.createElement('script');
consentScript.setAttribute('src', 'https://unpkg.com/@segment/consent-manager@1.1.1/standalone/consent-manager.js');
consentScript.setAttribute('integrity', 'sha256-cptjdzM9JCyAzOliNVMI+8U60l1MgdGbgop1MFfYoiU=');
consentScript.setAttribute('crossorigin', 'anonymous');
consentScript.setAttribute('defer', 'defer');
body.appendChild(consentScript);

$(document).ready(function() {
    $('#show-cookie-preferences').on('click', function(e) {
        if (typeof consentManager !== 'undefined') {
            e.preventDefault();
            consentManager.openConsentManager();
            $('#' + consentContainerId).hide();
        }
    });

    var styles = [];
    styles.push('#consent-container { position: fixed; left: 200px; right: 200px; bottom: 20px; z-index: 10000; }');
    styles.push('#consent-container > div { display: flex;  }');
    styles.push('#consent-container > div > div { margin: auto; padding: 10px 50px 10px 20px; background-color: #4353ff; color: white; border-radius: 3px; }');
    styles.push('@media screen and (max-width:991px) {');
    styles.push('  #consent-container { left: 12px; right: 12px; bottom: 50px; }');
    styles.push('}');
    $(body).append('<style type="text/css">' + styles.join('\n') + '</style>');
});