import { OverviewService } from './overview.service';
export declare class OverviewController {
    private readonly overviewService;
    constructor(overviewService: OverviewService);
    findAll(): Promise<any>;
}
