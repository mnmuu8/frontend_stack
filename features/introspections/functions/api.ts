import { createIntrospectionApiProps } from "@/common/types/api";
import axios from "axios";

export const callCreateIntrospection = ({options, introspectionFormData, setIsRegisterEvent, router}: createIntrospectionApiProps) => {
  const createIntrospection = async () => {
    const params = {
      evaluation: introspectionFormData.evaluation,
      reason: introspectionFormData.reason,
      keep_contents: introspectionFormData.keeps.map((keep: any) => keep.content),
      problem_contents: introspectionFormData.problems.map((problem: any) => problem.content),
      try_contents: introspectionFormData.tries.map((tries: any) => tries.content),
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;

    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  createIntrospection().then(res => {
    setIsRegisterEvent(true);
    router.push('/timeline');
  });
}

export const callUpdateIntrospection = ({options, introspectionFormData, setIsRegisterEvent, router}: createIntrospectionApiProps) => {
  const updateIntrospection = async () => {
    const params = {
      evaluation: introspectionFormData.evaluation,
      reason: introspectionFormData.reason,
      keep_contents: introspectionFormData.keeps.map((keep: any) => keep.content),
      problem_contents: introspectionFormData.problems.map((problem: any) => problem.content),
      try_contents: introspectionFormData.tries.map((tries: any) => tries.content),
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;

    try {
      const response = await axios.patch(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  updateIntrospection().then(res => {
    setIsRegisterEvent(true);
    router.push('/timeline');
  });
}
