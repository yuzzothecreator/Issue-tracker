const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "referrer-policy",
                        value: "no-referrer"
                    }
                ]
            }
        ]
    }
}
