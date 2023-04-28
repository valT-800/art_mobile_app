@extends('layouts.user')

@section('title', 'Albums')

@section('content')
<div class="card">
    <div class="card-header">
        <h6 class="m-0 font-weight-bold text-primary">
            @if(isset($album))
            Edit exist album
            @else
            Create new album
            @endif
        </h6>
    </div>
    <div class="card-body">

        {{-- Form::model ir Form::open metodai automatiškai prideda prie formos CSRF žetoną, todėl atskirai jo aprašyti nereikia --}}
        @if(isset($album))
        {{-- Esamo įrašo redagavimo forma --}}
        {!! Form::model($album, ['url' => ['user/albums', $album->id], 'method' => 'patch']) !!}
        @else
        {{-- Naujo įrašo įvedimo forma; metodo nereikia nurodyti, nes pagal nutylėjimą jis yra 'post' --}}
        {!! Form::open(['url' => 'user/albums']) !!}
        @endif

        <div class="form-group">
            {!! Form::label('title', 'Title: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!! Form::text('title', null, ['class' => 'form-control', 'required' => 'required']) !!}
            </div>
        </div>

        <div class="form-group">
            {!! Form::label('description', 'Description: ', ['class' => 'col-sm-3']) !!}
            <div class="col-sm-6">
                {!! Form::text('description', null, ['class' => 'form-control', 'required' => false]) !!}
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-3 col-sm-3">
                {!! Form::submit('Save', ['class' => 'btn btn-primary form-control']) !!}
            </div>
        </div>
        {!! Form::close() !!}
    </div>
</div>
@endsection