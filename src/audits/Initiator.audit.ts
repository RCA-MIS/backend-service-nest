import { SerializeOptions } from "@nestjs/common";
import {TimeStampAudit } from "./timestamp.audit";
import { Column } from "typeorm";


@SerializeOptions({
    strategy:'excludeAll'
})
export abstract class InitiatorAudit extends TimeStampAudit{

    createdBy: String;
    updatedBy: String;

}