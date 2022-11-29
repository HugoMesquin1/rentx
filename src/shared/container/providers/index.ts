import {container} from "tsyringe"

import { IDateProvider } from "../../Dateprovider/IDateProvider"
import { DayjsDateProvider } from "../../Dateprovider/implementations/DayJsDateProvider"
import { IMailProvider } from "../../MailProvider/IMailProvider"
import { EtherealMailProvider } from "../../MailProvider/implementations/EtherealMailProvider"
import { LocalStorageProvider } from "./LocalStorageProvider"
import {IStorageProvider} from "../IStorageProvider"

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    "EtheralMailProvider",
    new EtherealMailProvider()
)

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
)