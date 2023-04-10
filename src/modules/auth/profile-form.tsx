import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export function ProfileForm() {
  return (
    <form className="mx-auto max-w-5xl space-y-12">
      <div className="border-b border-slate-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Label htmlFor="first-name">First Name</Label>
            <Input type="text" id="first-name" placeholder="First Name" />
          </div>

          <div className="sm:col-span-3">
            <Label htmlFor="last-name">Last Name</Label>
            <Input type="text" id="last-name" placeholder="Last Name" />
          </div>

          <div className="sm:col-span-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </div>
      </div>

      <div className="border-b border-slate-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7">Notifications</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          We&apos;ll always let you know about important changes, but you pick
          what else you want to hear about.
        </p>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 ">
              By Email
            </legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <Checkbox id="comments" />
                <Label htmlFor="comments">Comments</Label>
              </div>
              <div className="relative flex gap-x-3">
                <Checkbox id="observations" />
                <Label htmlFor="observations">Observations</Label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button variant={'ghost'} type="button">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
