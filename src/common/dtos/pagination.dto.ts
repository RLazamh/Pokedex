import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    
    @IsInt()
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit? : number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    offset? : number;

}