'use client'

import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { createComment } from '@/api/v2/comments/action'

const FormSchema = z.object({
  comment: z.string().max(300, {
    message: 'Comment must not be longer than 300 characters.',
  }),
})

export const Comments = ({ articleID }: { articleID: string }) => {
  const [comments, setComments] = useState<string[] | undefined>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createComment(articleID, data.comment)
    setComments((comments) => [data.comment, ...comments])
    form.reset({ comment: '' })
  }

  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`/api/v2/comments?article=${articleID}`)
      const result = (await response.json()) as string[]
      setComments(result)
    }

    getComments()
  }, [articleID])

  return (
    comments && (
      <div className="flex flex-col gap-4">
        <h2 className="font-heading mb-2 pt-4 border-t text-2xl font-semibold border-netural-200">
          Comments
        </h2>

        {comments.map((comment, index) => (
          <Card key={index}>
            <CardContent>
              <div className="break-words">{comment}</div>
            </CardContent>
          </Card>
        ))}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Add your comments"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">Send comment</Button>
            </div>
          </form>
        </Form>
      </div>
    )
  )
}
