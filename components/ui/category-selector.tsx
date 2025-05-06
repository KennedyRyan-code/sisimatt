"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/sanity.types";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";


interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelector({ categories }: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>("");
    const router = useRouter();

    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-start text-left font-normal">
                {value ? categories.find((category) => category._id === value)?.title : "Filter by category"}
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search category..."
                className="h-9"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const selectedCategory = categories.find((c) =>
                        c.title
                            ?.toLowerCase()
                            .includes(e.currentTarget.value.toLowerCase())
                        );
                        if (selectedCategory?.slug?.current) {
                            setValue(selectedCategory._id);
                            router.push(`/categories/${selectedCategory.slug.current}`);
                            setOpen(false);
                        }
                    }
                }}
                />
                <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                        {categories.map((category) => (
                            <CommandItem key={category._id} value={category.title} onSelect={() => {
                                setValue(value === category._id ? "" : category._id);
                                router.push(`/categories/${category.slug?.current}`);
                                setOpen(false);
                            }}
                            >
                                {category.title}
                                <Check className={cn("mr-2 h-4 w-4", value === category._id ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>

        </PopoverContent>
    </Popover>

    )

}
