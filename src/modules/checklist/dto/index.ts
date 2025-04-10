export class CreateChecklistDto {
    title: string;
}

export class CreateItemDto {
    content: string;
}

export class UpdateItemDto {
    content?: string;
    completed?: boolean;
}