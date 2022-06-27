import { prop, Ref } from "@typegoose/typegoose";

import { cards, type allCard } from "../config/cards";
import { pickRandomCard } from "../utils";
import { User } from "./user";
import { Game } from "./game";

export class Card {
  @prop({ ref: () => User })
  public user?: Ref<User>;

  @prop({ ref: () => Game })
  public game?: Ref<Game>;

  @prop({
    type: () => [String],
    validate: (card: string) => (cards as string[])?.includes(card),
    default: () => [...new Array(6)].map(() => pickRandomCard()),
  })
  public cards?: string[];
}
