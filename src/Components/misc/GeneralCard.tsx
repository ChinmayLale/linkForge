import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Eye, TrendingUp } from 'lucide-react'

function GeneralCard() {
    return (
        <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-xl sm:text-2xl font-bold">1232</div>
                <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />+14%
                </div>
            </CardContent>
        </Card>
    )
}

export default GeneralCard
