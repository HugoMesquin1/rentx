

interface IMailProvider {

  SendMail(to:string, subject:string, body: string): Promise<void>

}

export {IMailProvider}