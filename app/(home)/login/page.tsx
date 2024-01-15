import { LoginForm } from '@/components/login-form';

export default async function IndexPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoginForm />
    </div>
  )
}
