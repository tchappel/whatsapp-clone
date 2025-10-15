"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/forms/input-group";
import { Button } from "@/components/ui/button";
import { Profile } from "@repo/supabase/types";
import { Check, Pencil } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { FormEventHandler, useEffect, useState } from "react";
import { updateProfileField } from "../actions/update-profile-field";

type EditableProfileField = keyof Pick<
  Profile,
  "avatar_path" | "display_name" | "status_message"
>;

type EditableProfileFieldProps<K extends EditableProfileField> = {
  fieldKey: K;
  initialValue: Profile[K];
};

export function EditableProfileField<K extends EditableProfileField>({
  initialValue,
  fieldKey,
}: EditableProfileFieldProps<K>) {
  const [isEditing, setIsEditing] = useState(false);
  const { result, execute, isPending, hasErrored, hasSucceeded } =
    useAction(updateProfileField);
  const [lastValidValue, setLastValidValue] = useState(initialValue);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isPending) return;
    const formData = new FormData(e.currentTarget);
    execute({ key: fieldKey, value: formData.get(fieldKey) as string });
  };

  useEffect(() => {
    if (hasSucceeded) {
      setLastValidValue(result.data?.value ?? "");
      setIsEditing(false);
    }
  }, [hasSucceeded, result.data?.value]);

  return (
    <>
      {isEditing ? (
        <>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputGroupInput
                type="text"
                name={fieldKey}
                id={fieldKey}
                autoFocus
                disabled={isPending}
                className="text-base md:text-base px-0"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  variant="ghost"
                  className="rounded-full"
                  size="icon-sm"
                >
                  <Check />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
          {hasErrored && (
            <p className="mt-1 text-destructive">{result.serverError}</p>
          )}
        </>
      ) : (
        <p className="flex items-center justify-between">
          <span>{lastValidValue}</span>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full ml-2 translate-y-[-2px]"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </p>
      )}
    </>
  );
}
