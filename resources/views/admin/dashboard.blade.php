{{-- @extends direktyvai nurodom, kokį vaizdą paveldės šis vaizdas --}}
@extends('layouts.admin')

{{-- sukuriam sekciją pavadinimu title, kurios reikšmė yra Dashboard --}}
{{-- šią sekciją galite iškviesti layouts/admin.blade.php vaizde su direktyva @yield('title')  --}}
@section('title', 'Dashboard')

{{-- sukuriam sekciją pavadinimu content, kurios reikšmė gali būti kodas iš kelių eilučių, todėl ši sekcija turi pabaigą @endsection  --}}
{{-- šią sekciją galite iškviesti layouts/admin.blade.php vaizde su direktyva @yield('content')  --}}
@section('content')
This is admin panel.
@endsection