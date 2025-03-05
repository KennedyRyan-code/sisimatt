import { BasketIcon, TagIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity"

export const salesType = defineType({
    name: 'sale',
    title: 'Sales',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Sale Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Sale Description',
            type: 'text',
        }),
        defineField({
            name: 'discountAmount',
            title: 'Discount Amount',
            type: 'number',
            description: 'Discount amount in percentage or fixed value',
        }),
        defineField({
            name: 'couponCode',
            title: 'Coupon Code',
            type: 'string',
        }),
        defineField({
            name: 'validFrom',
            title: 'Valid From',
            type: 'datetime',
        }),
        defineField({
            name: 'validUntil',
            title: 'Valid Until',
            type: 'datetime',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: "Toggle to activate or deactivate the sale",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            discountAmount: 'discountAmount',
            couponCode: 'couponCode',
            validFrom: 'validFrom',
            validUntil: 'validUntil',
            isActive: 'isActive',
        },
        prepare: (selection) => {
            const { title, discountAmount, couponCode, validFrom, validUntil, isActive } = selection;
            const status = isActive ? 'Active' : 'Inactive';
            return {
                title: title,
                subtitle: `Discount: ${discountAmount}% off | Coupon: ${couponCode} | Valid: ${validFrom} - ${validUntil} | Active: ${status}`,
            }
        }
    }
});