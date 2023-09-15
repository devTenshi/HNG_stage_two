import { Person, IPerson } from "../schemas/person.schema";
import moment from "moment";
import AppError from "../utils/error";

const exportResult = {
  async create(reqBody: Partial<IPerson>): Promise<IPerson> {
    const createdUser = new Person(reqBody);
    return createdUser.save();
  },
  async findAll(condition: any): Promise<IPerson[]> {
    const users = await Person.find(condition);
    return users;
  },
  async findOne(condition: any, options?: { select: string }) {
    const user = await Person.findOne(condition, options?.select);
    return user;
  },
  async findById(id: string, select: string) {
    const user = await Person.findById(id, select);
    return user;
  },
  async findOneAndUpdate(
    condition: { [key: string]: any },
    fields: { [key: string]: any },
    options?: { [key: string]: any }
  ) {
    return Person.findOneAndUpdate(condition, fields, options);
  },

  async updateOne(
    condition: { [key: string]: any },
    fields: { [key: string]: any }
  ): Promise<any> {
    const user = await Person.updateOne(condition, fields);
    return user;
  },
  async softDelete(userId: string): Promise<any> {
    const user = await Person.findById(userId);
    if (!user || user.deletedAt !== null)
      throw new AppError(404, "account not found");
    await Person.findByIdAndUpdate(
      userId,
      { deletedAt: moment().toDate() },
      { new: true }
    );
    return true;
  },
  async remove(
    _id: string
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    const user = await Person.findById(_id);
    if (!user) throw new AppError(404, "account not found");
    if (user.deletedAt !== null) throw new AppError(400, "account User first");
    return Person.deleteOne({ _id });
  },
};

export default exportResult;
