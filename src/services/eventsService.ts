import eventQueryModel, { EventQuery } from "../models/events";

class EventService {
  //create Event servie
  async event(data: EventQuery) {
    try {
      let result = await eventQueryModel.create(data);
      return result;
    } catch (e) {
      return false;
    }
  }

  //find one  Event service
  async findOneEvent(data: EventQuery) {
    try {
      let result: any = await eventQueryModel.findOne({ _id: data });
      return result;
    } catch (e) {
      return false;
    }
  }

  //find Event service
  async findEvent(): Promise<EventQuery> {
    try {
      let result: any = await eventQueryModel.find();
      return result;
    } catch (e) {
      return e;
    }
  }
  async findByIdUpdateQuery(id: any, data: EventQuery): Promise<EventQuery> {
    try {
      let payload = {
        isComplete: data,
      };
      let result: any = await eventQueryModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return result.isComplete;
    } catch (e) {
      return e;
    }
  }
}

export default new EventService();
