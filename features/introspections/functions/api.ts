import axios from "axios";
import { z } from 'zod';
import { ErrorMessages } from "@/common/types/validator";
import { introspectionSchema } from "@/common/functions/validator";
import { CreateIntrospectionProps, UpdateIntrospectionProps } from "../types/api";

export const callCreateIntrospection = async ({options, introspectionFormData, setErrorMessages}: CreateIntrospectionProps) => {
  try {
    introspectionSchema.parse(introspectionFormData);

    const params = {
      evaluation: introspectionFormData.evaluation,
      reason: introspectionFormData.reason,
      keep_contents: introspectionFormData.keeps.map((keep: any) => keep.content),
      problem_contents: introspectionFormData.problems.map((problem: any) => problem.content),
      try_contents: introspectionFormData.tries.map((tries: any) => tries.content),
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;
    await axios.post(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: ErrorMessages = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrorMessages(newErrors);

      throw error;
    } else {
      console.error("APIリクエストエラー:", error);
    }
  }
}

export const callUpdateIntrospection = async ({options, introspectionFormData, setErrorMessages}: UpdateIntrospectionProps) => {
  try {
    introspectionSchema.parse(introspectionFormData);

    const params = {
      evaluation: introspectionFormData.evaluation,
      reason: introspectionFormData.reason,
      keep_contents: introspectionFormData.keeps.map((keep: any) => keep.content),
      problem_contents: introspectionFormData.problems.map((problem: any) => problem.content),
      try_contents: introspectionFormData.tries.map((tries: any) => tries.content),
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;
    await axios.patch(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: ErrorMessages = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrorMessages(newErrors);

      throw error;
    } else {
      console.error("APIリクエストエラー:", error);
    }
  }
}
