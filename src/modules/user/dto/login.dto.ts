import {IsString, IsNotEmpty, Length, Matches }from 'class-validator'

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(8, 10, {message: "Have from 8-10 chars"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, { message: 'At least an upper, a lower and a digit',})
    password: string;
}