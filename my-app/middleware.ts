import { withAuth } from "next-auth/middleware";


export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Only allow users with admin or superadmin role
      return token?.role === "admin" || token?.role === "superadmin";
    },
   
  },
    pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin/:path((?!forgot-password|reset-password).*)",
  ],
};


