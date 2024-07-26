import type { NextApiRequest, NextApiResponse } from 'next';

type Course = {
  id: number;
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Course[]>) {
  try {
    const response = await fetch('http://localhost:8000/course/get');
    const data: Course[] = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json([]);
  }
}
