import { redirect } from 'next/navigation'

export default async function Page() {
  redirect('/articles/1')
}
