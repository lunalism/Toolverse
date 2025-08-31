// src/components/tools/StatCard.tsx

import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: number;
}

export function StatCard({ title, value }: StatCardProps) {
    return (
        <Card className="flex flex-col justify-between p-4 min-h-[100px]">
            <CardTitle className="text-sm font-normal text-muted-foreground line-clamp-2">
                {title}
            </CardTitle>
            <CardContent className="flex items-center justify-end p-0 pt-2">
                <span className="text-3xl font-bold text-primary">{value}</span>
            </CardContent>
        </Card>
    );
}