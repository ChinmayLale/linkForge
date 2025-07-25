"use client"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { Layout, Plus, ChevronRight } from "lucide-react"
import { templates, components } from "../../Constants"
import { Card, CardContent } from "../ui/card"

interface MobileSidebarProps {
    templatesOpen: boolean
    setTemplatesOpen: (open: boolean) => void
    componentsOpen: boolean
    setComponentsOpen: (open: boolean) => void
    applyTemplate: (templateId: string) => void
    addComponent: (type: string) => void
}

export function MobileSidebar({
    templatesOpen,
    setTemplatesOpen,
    componentsOpen,
    setComponentsOpen,
    applyTemplate,
    addComponent,
}: MobileSidebarProps) {
    return (
        <div className="p-4 space-y-4">
            <Collapsible open={templatesOpen} onOpenChange={setTemplatesOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-2">
                        <div className="flex items-center gap-2">
                            <Layout className="h-4 w-4" />
                            <span className="font-medium">Templates</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${templatesOpen ? "rotate-90" : ""}`} />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                        {templates.map((template) => (
                            <Card
                                key={template.id}
                                className={`cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${template.preview} h-16 flex items-center justify-center`}
                                onClick={() => applyTemplate(template.id)}
                            >
                                <CardContent>
                                    <div className="flex items-center">
                                        <div
                                            className={`w-full h-full rounded-md flex items-center justify-center text-xs font-medium`}
                                        >
                                           <h4 className="font-medium text-sm">{template.name}</h4>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Separator />
            <Collapsible open={componentsOpen} onOpenChange={setComponentsOpen}>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-2">
                        <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            <span className="font-medium">Components</span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${componentsOpen ? "rotate-90" : ""}`} />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                        {components.map((component) => (
                            <Button
                                key={component.id}
                                variant="outline"
                                className="h-16 p-2 flex flex-col gap-1 bg-transparent"
                                onClick={() => addComponent(component.type)}
                            >
                                <component.icon className="h-5 w-5" />
                                <span className="text-xs">{component.name}</span>
                            </Button>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
