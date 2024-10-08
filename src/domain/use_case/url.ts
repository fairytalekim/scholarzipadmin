const environments = {
    "development": 'http://localhost:3000',
    "production": 'https://scholarzipadmin.vercel.app',
} as const

const url = environments[process.env.NEXT_PUBLIC_ENVIRONMENT as keyof typeof environments];

export default url;