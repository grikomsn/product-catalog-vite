import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus, Minus, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { generateSlug } from "@/lib/slug";

/**
 * CartDrawer - Slide-out shopping cart drawer component.
 * 
 * Features:
 * - Trigger button with item count badge
 * - List of cart items with thumbnails
 * - Quantity adjustment controls (+/- buttons)
 * - Individual item removal
 * - Clear entire cart
 * - Total price calculation
 * - Empty state with CTA
 * - Checkout button (demo)
 * 
 * Uses shadcn/ui Sheet component for the slide-out panel.
 */
export function CartDrawer() {
  // Select individual store slices for better performance (prevents re-render on unrelated changes)
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());

  const isEmpty = items.length === 0;

  return (
    <Sheet>
      {/* Trigger button with item count badge overlay */}
      <SheetTrigger
        render={
          <Button variant="outline" size="icon" className="relative shrink-0">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge
                variant="default"
                className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center p-0 text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        }
      />
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        {/* Empty cart state */}
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
            <div className="rounded-full bg-muted p-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add some products to get started
              </p>
            </div>
            <SheetClose
              render={
                <Link to="/">
                  <Button>Continue Shopping</Button>
                </Link>
              }
            />
          </div>
        ) : (
          <>
            {/* Cart items list - scrollable area */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 rounded-lg border p-3"
                  >
                    {/* Clickable product thumbnail linking to detail page */}
                    <Link
                      to={`/product/${generateSlug(item.name)}`}
                      className="shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-md object-cover"
                      />
                    </Link>

                    {/* Product details and controls */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        {/* Product name links to detail page */}
                        <Link
                          to={`/product/${generateSlug(item.name)}`}
                          className="font-medium hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity adjustment controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Item subtotal and remove button */}
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart footer with totals and actions */}
            <SheetFooter className="flex-col gap-4 border-t pt-4">
              <div className="flex w-full items-center justify-between text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex w-full gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button className="flex-1">Checkout</Button>
              </div>

              <SheetClose
                render={
                  <Link to="/" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                }
              />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
