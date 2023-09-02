import { Request, Response } from 'express';
import { readFile } from 'fs/promises';

const roomController = async (req: Request, res: Response) => {
  try {
    const content = await readFile("public/index.html")
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.write(content);
    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default roomController;
