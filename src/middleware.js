import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protect dashboard, budget, checklist, vendors routes (not onboarding)
    const protectedRoutes = ['/dashboard', '/budget', '/checklist', '/vendors']
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Check if user has completed onboarding (for protected routes except onboarding itself)
    if (isProtectedRoute && user) {
        const { data: wedding } = await supabase
            .from('weddings')
            .select('id')
            .eq('user_id', user.id)
            .single()

        if (!wedding) {
            const url = request.nextUrl.clone()
            url.pathname = '/onboarding'
            return NextResponse.redirect(url)
        }
    }

    // Redirect authenticated users away from login/signup
    if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && user) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
