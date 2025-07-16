import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Eye, TrendingUp, Info } from 'lucide-react'

interface GeneralCardProps {
    title?: string
    desc?: string | number
    trend?: string
    icon?: React.ReactNode
    subtext1?: string
    subtext2?: string
}

function GeneralCard({
    title = 'Total Views',
    desc = '1232',
    trend = '+14%',
    icon = <Eye className="h-4 w-4 text-muted-foreground" />,
    subtext1 = 'This is Subtext',
    subtext2 = 'subtext2',
}: GeneralCardProps) {
    return (
        <Card className="h-full min-h-[120px] flex flex-col justify-center">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-semibold whitespace-normal max-w-[75%] sm:max-w-full">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{desc}</div>
                <div className="flex items-center text-sm text-green-600 mb-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {trend}
                </div>

                <div className="text-sm space-y-1">
                    {subtext1 && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Info className="h-3 w-3" />
                            <span className="font-medium text-card-foreground whitespace-normal max-w-[75%] sm:max-w-full">{subtext1}</span>
                        </div>
                    )}
                    {subtext2 && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Info className="h-3 w-3" />
                            <span className="font-medium text-primary whitespace-normal max-w-[75%] sm:max-w-full">{subtext2}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default GeneralCard
