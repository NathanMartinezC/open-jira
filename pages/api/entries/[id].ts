import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({ message: 'ID is not valid ' + id })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
        default:
            return res.status(400).json({ message: "bad request" })
    }
}


const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Instance not found: ' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true } )
        await db.disconnect();
        res.status(200).json( updatedEntry! );
    } catch (error) {
        console.log({ error });
        await db.disconnect();
        res.status(400).json({ message: 'bad request' })
    }
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryToRetrieve = await Entry.findById( id );

    if ( !entryToRetrieve ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Instance not found: ' + id })
    }

    await db.disconnect();
    res.status(200).json(entryToRetrieve);
}