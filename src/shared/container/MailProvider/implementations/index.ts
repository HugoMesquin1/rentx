import { IMailProvider } from "../IMailProvider"
import { EtherealMailProvider } from "./EtherealMailProvider"
import { container } from "tsyringe"


container.registerSingleton<IMailProvider>(
  "EtherealMailProvider",
  EtherealMailProvider
)