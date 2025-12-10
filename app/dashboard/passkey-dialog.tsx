"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function PasskeyRegistrationDialog() {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("formData", formData);
    if (!formData.get("name")) {
      alert("Please provide a name for your passkey");
      return;
    }
    const { data, error } = await authClient.passkey.addPasskey({
      name: formData.get("name") as string,
      authenticatorAttachment: "cross-platform",
    });

    console.log({ data, error });
  };

  useEffect(() => {
    if (session && !session.user.initialized) {
      setOpen(true);
      authClient.updateUser({
        initialized: true,
      });
    }
  }, [session]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Register Passkey</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Passkey?</DialogTitle>
          <DialogDescription>
            Add the passkey to your account for easy and secure login
          </DialogDescription>
        </DialogHeader>
        <form className={cn("flex flex-col gap-6")} onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Device Name</FieldLabel>
              <FieldDescription>
                Help you recognize your device
              </FieldDescription>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="My Device"
                required
              />
            </Field>
            <Field>
              <Button type="submit">Add</Button>
            </Field>
            <FieldSeparator>Or</FieldSeparator>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
