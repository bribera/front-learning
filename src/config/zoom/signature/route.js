import crypto from 'crypto'

export async function POST(req) {
    const { meetingNumber, role } = await req.json()

    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(
        process.env.ZOOM_API_KEY + meetingNumber + timestamp + role
    ).toString('base64')

    const hash = crypto
        .createHmac('sha256', process.env.ZOOM_API_SECRET)
        .update(msg)
        .digest('base64')

    const signature = Buffer.from(
        `${process.env.ZOOM_API_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString('base64')

    return Response.json({ signature })
}