// instrumentation-client.js
import posthog from 'posthog-js'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (posthogKey && posthogHost) {
posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: 'history_change'
});
}

