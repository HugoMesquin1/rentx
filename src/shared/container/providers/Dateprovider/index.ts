import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { container } from "tsyringe"
import { EtherealMailProvider } from "../MailProvider/implementations/EtherealMailProvider"
import { IDateProvider } from "./IDateProvider"
import { DayjsDateProvider } from "./implementations/DayJsDateProvider"


container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
   DayjsDateProvider
)

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)