import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';

//VERCEL: https://www.youtube.com/watch?v=dDpZfOQBMaU
// indian https://www.youtube.com/watch?v=R_Pj593TH_Q

const initialState = {
  message: null,
};

const SubmitButton = ({ message }: any) => {
  // const { peding } = useFormStatus();

  return (
    <>
      Hi! asdas
      {/* <Button type='submit' aria-disabled={peding}>
        Add Asset
      </Button> */}
    </>
  );
};

export const AddAssetForm = () => {
  // const [state, formAction] = useFormState(addAsset, initialState);
  return (
    <>
      Hi!
      {/* <form action={formAction}>
        <label htmlFor='asset'>Enter Asset</label>
        <input type='text' name='asset' id='asset' required />
        <SubmitButton />
      </form> */}
    </>
  );
};
