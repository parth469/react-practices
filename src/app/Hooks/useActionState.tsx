"use client";
import { useActionState } from "react";

type FormResult = {
  name: string;
  email: string;
};

async function update(
  prevState: unknown,
  formData: FormData
): Promise<FormResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const rawData = Object.fromEntries(formData.entries());

  console.log(rawData, formData.entries());

  return { name, email };
}

export const UseActionState = () => {
  const [state, formAction, isLoading] = useActionState<FormResult, FormData>(
    update,
    {
      name: "",
      email: "",
    }
  );

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <form action={formAction}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />

          <button type="submit">Submit</button>
        </form>
      )}

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
