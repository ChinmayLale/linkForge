"use client"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible"
import { Layout, Plus, ChevronRight } from "lucide-react"
import { templates, components } from "../../Constants"

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
                            <Button
                                key={template.id}
                                variant="outline"
                                className="h-16 p-2 flex flex-col gap-1 bg-transparent"
                                onClick={() => applyTemplate(template.id)}
                            >
                                <div className={`w-full h-6 rounded text-xs flex items-center justify-center ${template.preview}`}>
                                    {template.name}
                                </div>
                            </Button>
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
