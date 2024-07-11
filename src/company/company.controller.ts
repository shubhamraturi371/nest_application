import {Body, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CompanyId, CompanyValidationDto, UpdateCompany} from "../dto/company.dto";
import {CompanyService} from "./company.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Post('create')
    async createCompany(@Body() comData: CompanyValidationDto) {
        return this.companyService.createCompany(comData);

    }

    @Patch('update/:companyId/')
    async updateCompany(@Param('companyId') companyId: CompanyId, @Body() updateData: UpdateCompany) {
        return this.companyService.updateCompany(companyId, updateData);
    }

    @Delete('delete')
    async deleteCompany() {
        return 'Under progress';
    }
}
