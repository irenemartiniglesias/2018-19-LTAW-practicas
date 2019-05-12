from django import forms


class ContactForm(forms.Form):
    nombre = forms.CharField(max_length=100, label= 'Nombre y apellidos')
    CHOICES=[('iphone xs','Iphone XS'),
             ('iphone xr','Iphone XR'),
             ('iphone 8 plus','Iphone 8 Plus'),
             ('samsung S9','Samsung S9'),
              ('samsung A9','Samsung A9'),
              ('Huawei Mate 20','Huawei Mate 20'),]
    movile = forms.ChoiceField(choices=CHOICES)
    mail = forms.CharField(max_length=100, label= 'e-mail')
    direccion = forms.CharField(max_length=100, label= 'Direccion')
    message = forms.CharField(widget=forms.Textarea)
