"use client"

import AuthLayout from "@/components/auth/AuthLayout"
import LoginForm from "@/components/auth/LoginForm"
import Login3D from "@/components/auth/Login3D"

export default function LoginPage() {
  return (
    <AuthLayout scene3D={<Login3D />}>
      <LoginForm />
    </AuthLayout>
  )
}
