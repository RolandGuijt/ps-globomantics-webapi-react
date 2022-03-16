type Error = {
  [name: string]: string[];
};

type Problem = {
  type: string;
  title: string;
  status: number;
  errors: Error;
};

export default Problem;
