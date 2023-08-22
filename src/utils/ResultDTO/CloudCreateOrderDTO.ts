export class OrderItemDTO {
    id: string;
    num: number;
    type: number;
}

export class CloudCreateOrderDTO {
    orderName : string;
    pledgeProfitRatioId: number;
    orderItemList: OrderItemDTO[];
}
