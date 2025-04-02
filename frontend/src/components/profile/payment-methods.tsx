"use client";

import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUserProfile } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, CreditCard, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentMethod {
  type: string;
  cardLastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

export function PaymentMethods() {
  const { data: profileData, isLoading } = useGetUserProfile();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    type: "visa",
  });

  useEffect(() => {
    if (profileData?.paymentMethods) {
      setPaymentMethods(profileData.paymentMethods);
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setNewCard((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleAddCard = () => {
    // This would connect to your API in a real implementation
    console.log("Adding card:", newCard);

    // Mock implementation for UI demo
    const mockNewCard: PaymentMethod = {
      type: newCard.type,
      cardLastFour: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      isDefault: paymentMethods.length === 0, // Make default if it's the first card
    };

    setPaymentMethods((prev) => [...prev, mockNewCard]);
    setDialogOpen(false);

    // Reset form
    setNewCard({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      type: "visa",
    });
  };

  const setAsDefault = (index: number) => {
    setPaymentMethods((prev) =>
      prev.map((method, i) => ({
        ...method,
        isDefault: i === index,
      }))
    );
  };

  const removePaymentMethod = (index: number) => {
    setPaymentMethods((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      // If we removed the default card and there are other cards,
      // make the first one default
      if (prev[index].isDefault && updated.length > 0) {
        updated[0].isDefault = true;
      }

      return updated;
    });
  };

  if (isLoading) {
    return (
      <>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-14">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-5 w-36">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <div className="h-4 w-24">
                      <Skeleton className="h-full w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-9 w-9">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="h-9 w-9">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Phương thức thanh toán</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Thêm thẻ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm thẻ thanh toán mới</DialogTitle>
              <DialogDescription>
                Thông tin thẻ của bạn sẽ được bảo mật và mã hóa
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Loại thẻ</Label>
                <Select value={newCard.type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại thẻ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="jcb">JCB</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Tên chủ thẻ</Label>
                <Input
                  id="cardholderName"
                  value={newCard.cardholderName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Số thẻ</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={newCard.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" onClick={handleAddCard}>
                Lưu thẻ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Không có phương thức thanh toán
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Thêm thẻ thanh toán để đặt phòng nhanh chóng và thuận tiện
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm thẻ
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      {method.type.charAt(0).toUpperCase() +
                        method.type.slice(1)}{" "}
                      •••• {method.cardLastFour}
                      {method.isDefault && (
                        <BadgeCheck className="h-4 w-4 text-primary ml-2" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Hết hạn {method.expiryDate}
                      {method.isDefault && " (Mặc định)"}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!method.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAsDefault(index)}
                    >
                      Đặt mặc định
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePaymentMethod(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </>
  );
}
