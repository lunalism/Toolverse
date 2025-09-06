// src/app/api/ip/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 서버에서 직접 IP-API를 호출합니다. 여기서는 CORS 문제가 발생하지 않습니다.
        const res = await fetch('http://ip-api.com/json');
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ status: 'fail', message: 'Failed to fetch IP info from server' }, { status: 500 });
    }
}